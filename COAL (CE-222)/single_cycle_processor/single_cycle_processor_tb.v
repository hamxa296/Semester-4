`timescale 1ns / 1ps

module single_cycle_processor_tb;

    reg clk;
    reg reset;

    wire [31:0] pc_out;
    wire [31:0] instruction;
    wire [31:0] alu_result;
    wire [31:0] read_data;
    wire        zero_flag;

    single_cycle_processor uut (
        .clk(clk),
        .reset(reset),
        .pc_out(pc_out),
        .instruction(instruction),
        .alu_result(alu_result),
        .read_data(read_data),
        .zero_flag(zero_flag)
    );

    initial begin
        $dumpfile("single_cycle_processor.vcd");
        $dumpvars(0, single_cycle_processor_tb);
    end

    initial begin
        clk = 1'b0;
        forever #5 clk = ~clk;
    end

    initial begin
        reset = 1'b1;
        #12;
        reset = 1'b0;

        #120;

        $display("Final Register Values:");
        $display("x1 = %0d", uut.regs.registers[1]);
        $display("x2 = %0d", uut.regs.registers[2]);
        $display("x3 = %0d", uut.regs.registers[3]);
        $display("x4 = %0d", uut.regs.registers[4]);
        $display("x5 = %0d", uut.regs.registers[5]);
        $display("x6 = %0d", uut.regs.registers[6]);
        $display("x7 = %0d", uut.regs.registers[7]);

        if (uut.regs.registers[1] == 32'd5  &&
            uut.regs.registers[2] == 32'd10 &&
            uut.regs.registers[3] == 32'd15 &&
            uut.regs.registers[4] == 32'd5  &&
            uut.regs.registers[5] == 32'd0  &&
            uut.regs.registers[6] == 32'd15 &&
            uut.regs.registers[7] == 32'd2) begin
            $display("TEST PASSED");
        end else begin
            $display("TEST FAILED");
        end

        $finish;
    end

    initial begin
        $monitor("t=%0t pc=%h instr=%h alu=%h zero=%b",
                 $time, pc_out, instruction, alu_result, zero_flag);
    end

endmodule
