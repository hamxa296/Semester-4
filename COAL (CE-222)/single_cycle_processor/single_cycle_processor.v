module single_cycle_processor(
    input          clk,
    input          reset,
    output  [31:0] pc_out,
    output  [31:0] instruction,
    output  [31:0] alu_result,
    output  [31:0] read_data,
    output         zero_flag
);

    wire [31:0] pc_next;
    wire [31:0] pc_plus_4;
    wire [31:0] branch_target;
    wire [31:0] imm;
    wire [6:0]  opcode;
    wire [4:0]  rd;
    wire [2:0]  funct3;
    wire [4:0]  rs1;
    wire [4:0]  rs2;
    wire [6:0]  funct7;
    wire [31:0] alu_input_b;
    wire [31:0] write_back_data;
    wire [31:0] read_data1;
    wire [31:0] read_data2;
    wire [3:0]  alu_ctrl;
    wire        alu_src;
    wire        mem_to_reg;
    wire        reg_write;
    wire        mem_read;
    wire        mem_write;
    wire        branch;
    wire [1:0]  alu_op;
    wire        branch_taken;

    program_counter pc(
        .clk(clk),
        .reset(reset),
        .next_pc(pc_next),
        .pc_out(pc_out)
    );

    instruction_memory imem(
        .addr(pc_out),
        .reset(reset),
        .instruction(instruction),
        .opcode(opcode),
        .rd(rd),
        .funct3(funct3),
        .rs1(rs1),
        .rs2(rs2),
        .funct7(funct7),
        .immediate(imm)
    );

    adder pc_adder(
        .a(pc_out),
        .b(32'd4),
        .sum(pc_plus_4)
    );

    control_unit ctrl(
        .opcode(opcode),
        .alu_src(alu_src),
        .mem_to_reg(mem_to_reg),
        .reg_write(reg_write),
        .mem_read(mem_read),
        .mem_write(mem_write),
        .branch(branch),
        .alu_op(alu_op)
    );

    register_file regs(
        .clk(clk),
        .reset(reset),
        .reg_write(reg_write),
        .read_reg1(rs1),
        .read_reg2(rs2),
        .write_reg(rd),
        .write_data(write_back_data),
        .read_data1(read_data1),
        .read_data2(read_data2)
    );

    adder target_adder(
        .a(pc_out),
        .b(imm),
        .sum(branch_target)
    );

    assign branch_taken = branch & zero_flag;

    mux2to1 branch_mux(
        .in0(pc_plus_4),
        .in1(branch_target),
        .sel(branch_taken),
        .out(pc_next)
    );

    mux2to1 alu_src_mux(
        .in0(read_data2),
        .in1(imm),
        .sel(alu_src),
        .out(alu_input_b)
    );

    alu_control aluctrl(
        .alu_op(alu_op),
        .funct3(funct3),
        .funct7(funct7),
        .alu_ctrl(alu_ctrl)
    );

    alu main_alu(
        .a(read_data1),
        .b(alu_input_b),
        .alu_ctrl(alu_ctrl),
        .result(alu_result),
        .zero(zero_flag)
    );

    data_memory dmem(
        .clk(clk),
        .mem_read(mem_read),
        .mem_write(mem_write),
        .addr(alu_result),
        .write_data(read_data2),
        .read_data(read_data)
    );

    mux2to1 mem_to_reg_mux(
        .in0(alu_result),
        .in1(read_data),
        .sel(mem_to_reg),
        .out(write_back_data)
    );

endmodule
