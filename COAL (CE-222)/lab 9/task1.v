`timescale 1ns / 1ps 
module task1 (
    output reg ALUSrc,
    output reg MemtoReg,
    output reg RegWrite,
    output reg MemRead,
    output reg MemWrite,
    output reg Branch,
    output reg ALUOp1,
    output reg ALUOp0,
    input [6:0] inputs
);
always @(*) begin
    case(inputs)
    7'b0110011: begin
        ALUSrc = 0; MemtoReg = 0; RegWrite = 1; MemRead = 0;
        MemWrite = 0; Branch = 0; ALUOp1 = 1; ALUOp0 = 0;
    end
    7'b0000011: begin
        ALUSrc = 1; MemtoReg = 1; RegWrite = 1; MemRead = 1;
        MemWrite = 0; Branch = 0; ALUOp1 = 0; ALUOp0 = 0;
    end
    7'b0100011: begin
        ALUSrc = 1; MemtoReg = 1'bx; RegWrite = 0; MemRead = 0;
        MemWrite = 1; Branch = 0; ALUOp1 = 0; ALUOp0 = 0;
    end
    7'b1100011: begin
        ALUSrc = 0; MemtoReg = 1'bx; RegWrite = 0; MemRead = 0;
        MemWrite = 0; Branch = 1; ALUOp1 = 0; ALUOp0 = 1;
    end
    endcase
end
endmodule

