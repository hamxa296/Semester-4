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

            memory[0]  = 8'h93;
            memory[1]  = 8'h00;
            memory[2]  = 8'h50;
            memory[3]  = 8'h00;

            memory[4]  = 8'h13;
            memory[5]  = 8'h01;
            memory[6]  = 8'hA0;
            memory[7]  = 8'h00;

            memory[8]  = 8'hB3;
            memory[9]  = 8'h81;
            memory[10] = 8'h20;
            memory[11] = 8'h00;

            memory[12] = 8'h33;
            memory[13] = 8'h02;
            memory[14] = 8'h11;
            memory[15] = 8'h40;

            memory[16] = 8'hB3;
            memory[17] = 8'hF2;
            memory[18] = 8'h20;
            memory[19] = 8'h00;

            memory[20] = 8'h33;
            memory[21] = 8'hE3;
            memory[22] = 8'h20;
            memory[23] = 8'h00;

            memory[24] = 8'h63;
            memory[25] = 8'h86;
            memory[26] = 8'h40;
            memory[27] = 8'h00;

            memory[28] = 8'h93;
            memory[29] = 8'h03;
            memory[30] = 8'h10;
            memory[31] = 8'h00;

            memory[32] = 8'h93;
            memory[33] = 8'h03;
            memory[34] = 8'h20;
            memory[35] = 8'h00;
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

addi x1, x0, 5      # x1 = 5
addi x2, x0, 10     # x2 = 10

add  x3, x1, x2     # x3 = 15
sub  x4, x2, x1     # x4 = 5
and  x5, x1, x2     # x5 = 0 (5 & 10)
or   x6, x1, x2     # x6 = 15

beq  x1, x4, label  # branch if equal (5 == 5 -> YES)

addi x7, x0, 1      # SHOULD BE SKIPPED

label:
addi x7, x0, 2      # x7 = 2

*/
