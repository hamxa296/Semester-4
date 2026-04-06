`timescale 1ns / 1ps
`include "task1.v"
module test1;
reg rd,wr;
reg [4:0] address;
reg clk;
reg [31:0] data;

wire [31:0] out;

    task1 uut(.out(out), .rd(rd), .wr(wr), 
    .address(address), .data(data), .clk(clk));
always #5 clk = ~clk;

    initial begin 
       
    clk = 0;
    rd = 0;
    wr = 0;
    address = 5'b00000;
    data = 33'h0;

    $dumpfile("test1.vcd");
    $dumpvars(0, test1);

    
    #20 rd = 0; wr = 1; address = 5'd0;  data = 33'd0;
    #20 rd = 0; wr = 1; address = 5'd1;  data = 33'd1;
    #20 rd = 0; wr = 1; address = 5'd2;  data = 33'd2;
    #20 rd = 0; wr = 1; address = 5'd3;  data = 33'd3;
    #20 rd = 0; wr = 1; address = 5'd4;  data = 33'd4;
    #20 rd = 0; wr = 1; address = 5'd5;  data = 33'd5;
    #20 rd = 0; wr = 1; address = 5'd6;  data = 33'd6;
    #20 rd = 0; wr = 1; address = 5'd7;  data = 33'd7;
    #20 rd = 0; wr = 1; address = 5'd8;  data = 33'd8;
    #20 rd = 0; wr = 1; address = 5'd9;  data = 33'd9;
    #20 rd = 0; wr = 1; address = 5'd10; data = 33'd10;
    #20 rd = 0; wr = 1; address = 5'd11; data = 33'd11;
    #20 rd = 0; wr = 1; address = 5'd12; data = 33'd12;
    #20 rd = 0; wr = 1; address = 5'd13; data = 33'd13;
    #20 rd = 0; wr = 1; address = 5'd14; data = 33'd14;
    #20 rd = 0; wr = 1; address = 5'd15; data = 33'd15;

    #40 wr = 0; 

    
    #20 rd = 1; wr = 0; address = 5'd0;
    #20 rd = 1; wr = 0; address = 5'd1;
    #20 rd = 1; wr = 0; address = 5'd2;
    #20 rd = 1; wr = 0; address = 5'd3;
    #20 rd = 1; wr = 0; address = 5'd4;
    #20 rd = 1; wr = 0; address = 5'd5;
    #20 rd = 1; wr = 0; address = 5'd6;
    #20 rd = 1; wr = 0; address = 5'd7;
    #20 rd = 1; wr = 0; address = 5'd8;
    #20 rd = 1; wr = 0; address = 5'd9;
    #20 rd = 1; wr = 0; address = 5'd10;
    #20 rd = 1; wr = 0; address = 5'd11;
    #20 rd = 1; wr = 0; address = 5'd12;
    #20 rd = 1; wr = 0; address = 5'd13;
    #20 rd = 1; wr = 0; address = 5'd14;
    #20 rd = 1; wr = 0; address = 5'd15;

    #40 $finish; 
end
    initial begin
        $monitor("Time: %0t | Addr: %d | DataIn: %d | Out: %d | WR: %b | RD: %b", 
                 $time, address, data, out, wr, rd);
    end
endmodule