module immediate_generator(
    input  wire [31:0] instruction,
    output reg  [31:0] imm
);

    wire [6:0] opcode = instruction[6:0];

    always @(*) begin
        case (opcode)
            7'b0010011: imm = {{20{instruction[31]}}, instruction[31:20]}; // addi
            7'b1100011: imm = {{19{instruction[31]}}, instruction[31], instruction[7], instruction[30:25], instruction[11:8], 1'b0}; // beq
            default: imm = 32'b0;
        endcase
    end

endmodule
