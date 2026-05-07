`timescale 1ns / 1ps

module instruction_decoder(
    input  wire [31:0] instruction,
    output wire [6:0]  opcode,
    output wire [4:0]  rd,
    output wire [2:0]  funct3,
    output wire [4:0]  rs1,
    output wire [4:0]  rs2,
    output wire [6:0]  funct7,
    output wire [31:0] immediate
);

    assign opcode = instruction[6:0];
    assign rd = instruction[11:7];
    assign funct3 = instruction[14:12];
    assign rs1 = instruction[19:15];
    assign rs2 = instruction[24:20];
    assign funct7 = instruction[31:25];

    immediate_generator imm_gen(
        .instruction(instruction),
        .imm(immediate)
    );

endmodule

module instruction_memory(
    input  wire [31:0] addr,
    input  wire        reset,
    output wire [31:0] instruction,
    output wire [6:0]  opcode,
    output wire [4:0]  rd,
    output wire [2:0]  funct3,
    output wire [4:0]  rs1,
    output wire [4:0]  rs2,
    output wire [6:0]  funct7,
    output wire [31:0] immediate
);

    reg [7:0] memory [0:63];
    integer i;

    assign instruction = {memory[addr + 32'd3], memory[addr + 32'd2], memory[addr + 32'd1], memory[addr]};

    instruction_decoder decoder(
        .instruction(instruction),
        .opcode(opcode),
        .rd(rd),
        .funct3(funct3),
        .rs1(rs1),
        .rs2(rs2),
        .funct7(funct7),
        .immediate(immediate)
    );

    task load_program;
        begin
            for (i = 0; i < 64; i = i + 1)
                memory[i] = 8'h00;

            // 0: lw x1, 0(x0)     (x1 = 10)
            memory[0]  = 8'h83; memory[1] = 8'h20; memory[2] = 8'h00; memory[3] = 8'h00;
            
            // 4: lw x2, 4(x0)     (x2 = 20)
            memory[4]  = 8'h03; memory[5] = 8'h21; memory[6] = 8'h40; memory[7] = 8'h00;
            
            // 8: add x3, x1, x2   (x3 = 30)
            memory[8]  = 8'hB3; memory[9] = 8'h81; memory[10] = 8'h20; memory[11] = 8'h00;
            
            // 12: sub x4, x2, x1  (x4 = 10)
            memory[12] = 8'h33; memory[13] = 8'h02; memory[14] = 8'h11; memory[15] = 8'h40;
            
            // 16: sw x3, 8(x0)    (mem[8] = 30)
            memory[16] = 8'h23; memory[17] = 8'h24; memory[18] = 8'h30; memory[19] = 8'h00;
            
            // 20: and x5, x3, x4  (x5 = 30 & 10 = 10)
            memory[20] = 8'hB3; memory[21] = 8'hF2; memory[22] = 8'h41; memory[23] = 8'h00;
            
            // 24: or x6, x3, x4   (x6 = 30 | 10 = 30)
            memory[24] = 8'h33; memory[25] = 8'hE3; memory[26] = 8'h41; memory[27] = 8'h00;
            
            // 28: beq x4, x1, 8   (if 10 == 10, jump to 36)
            memory[28] = 8'h63; memory[29] = 8'h04; memory[30] = 8'h12; memory[31] = 8'h00;
            
            // 32: sw x1, 12(x0)   (skipped)
            memory[32] = 8'h23; memory[33] = 8'h26; memory[34] = 8'h10; memory[35] = 8'h00;
            
            // 36: sw x2, 16(x0)   (mem[16] = 20)
            memory[36] = 8'h23; memory[37] = 8'h28; memory[38] = 8'h20; memory[39] = 8'h00;
        end
    endtask

    initial begin
        load_program();
    end

    always @(posedge reset) begin
        load_program();
    end

endmodule

/*
    TEST PROGRAM:
    0:  lw  x1, 0(x0)   # x1 = 10 (from pre-loaded memory)
    4:  lw  x2, 4(x0)   # x2 = 20 (from pre-loaded memory)
    8:  add x3, x1, x2  # x3 = 30
    12: sub x4, x2, x1  # x4 = 10
    16: sw  x3, 8(x0)   # mem[8] = 30
    20: and x5, x3, x4  # x5 = 10
    24: or  x6, x3, x4  # x6 = 30
    28: beq x4, x1, 8   # if x4(10) == x1(10), jump to 36 (offset 8)
    32: sw  x1, 12(x0)  # SHOULD BE SKIPPED
    36: sw  x2, 16(x0)  # mem[16] = 20
*/
