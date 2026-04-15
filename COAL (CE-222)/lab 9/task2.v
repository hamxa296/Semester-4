`timescale 1ns / 1ps 
module task2 (
    input [2:0] funct3,
    input [6:0] funct7,
    input [1:0] ALUOp,
    output reg [3:0] Operation
);

always @(*) begin
    Operation = 4'b0000;  // Default value
    casez(ALUOp)
    2'b00: Operation = 4'b0010;
    2'b01: Operation = 4'b0110;
    2'b1?: begin
        if(funct3 == 3'b000) begin
            if(funct7 == 7'b0000000) Operation = 4'b0010;
            else if(funct7 == 7'b1111111) Operation = 4'b0110;
            else Operation = 4'b0000;
        end
        else if(funct3 == 3'b111 && funct7 == 7'b0000000) Operation = 4'b0000;
        else if(funct3 == 3'b110 && funct7 == 7'b0000000) Operation = 4'b0001;
        else Operation = 4'b0000;
    end
    endcase 
end
endmodule