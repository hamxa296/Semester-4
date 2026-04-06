`timescale 1ns / 1ps 

module task1 (
    output reg [31:0] out,
    input rd,wr,
    input [4:0] address,
    input [31:0] data,
    input clk
);
 reg [31:0] memory [31:0];

always @(posedge clk)
    begin   
        if(wr)
            memory[address]<=data;
        if(rd)
            out <= memory[address];
    end
            
endmodule