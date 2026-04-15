`timescale 1ns / 1ps 
module test1;
    wire ALUSrc,
         MemtoReg,
         RegWrite,
         MemRead,
         MemWrite,
         Branch,
         ALUOp1,
         ALUOp0;
    reg [6:0] inputs;
    
    task1 uut (
        .ALUSrc(ALUSrc),
        .MemtoReg(MemtoReg),
        .RegWrite(RegWrite),
        .MemRead(MemRead),
        .MemWrite(MemWrite),
        .Branch(Branch),
        .ALUOp1(ALUOp1),
        .ALUOp0(ALUOp0),
        .inputs(inputs)
    );
initial begin
    $dumpfile("test1.vcd");
    $dumpvars(0, test1);
    $monitor("Time=%0t inputs=%b ALUSrc=%b MemtoReg=%b RegWrite=%b MemRead=%b MemWrite=%b Branch=%b ALUOp1=%b ALUOp0=%b", 
             $time, inputs, ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch, ALUOp1, ALUOp0);
    inputs = 7'b0110011;
    #100
    inputs = 7'b0000011;
    #100
    inputs = 7'b0100011;
    #100
    inputs = 7'b1100011;
    #100
    $finish;
end
endmodule