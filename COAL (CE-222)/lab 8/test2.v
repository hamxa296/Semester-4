`timescale 1ns / 1ps
`include "task2.v"
module test2;
    wire [31:0] out1;
    wire [31:0] out2;
    reg RegWrite;
    reg [4:0] address1;
    reg [4:0] address2;
    reg [4:0] Write_address;
    reg [31:0] data;
    reg clk;
    reg reset;

    task2 uut (
        .out1(out1),
        .out2(out2),
        .RegWrite(RegWrite),
        .address1(address1),
        .address2(address2),
        .Write_address(Write_address),
        .data(data),
        .clk(clk),
        .reset(reset)
    );

    always #5 clk = ~clk;

    initial begin
        $dumpfile("test2.vcd");
        $dumpvars(0, test2);

        clk = 0;
        reset = 1;
        RegWrite = 0;
        address1 = 5'd0;
        address2 = 5'd0;
        Write_address = 5'd0;
        data = 32'd0;

        #15 reset = 0;

        #20
        RegWrite = 1;
        address1 = 0;
        address2 = 0;
        Write_address = 1;
        data = 1234;

        #20
        RegWrite = 1;
        address1 = 1;
        address2 = 0;
        Write_address = 2;
        data = 56789;

        #20
        RegWrite = 1;
        address1 = 1;
        address2 = 2;
        Write_address = 3;
        data = 10111213;

        #100 $finish; 
    end

    initial begin
        $monitor("Time=%0t | Reset=%b | Addr1=%d | Out1=%d | Addr2=%d | Out2=%d | WriteAddr=%d | Data=%d | RegWrite=%b", 
                 $time, reset, address1, out1, address2, out2, Write_address, data, RegWrite);
    end

endmodule