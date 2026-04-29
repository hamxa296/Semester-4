module alu_control(
    input  wire [1:0] alu_op,
    input  wire [2:0] funct3,
    input  wire [6:0] funct7,
    output reg  [3:0] alu_ctrl
);

    always @(*) begin
        case (alu_op)
            2'b00: alu_ctrl = 4'b0010; // add
            2'b01: alu_ctrl = 4'b0110; // sub
            2'b10: begin
                case (funct3)
                    3'b000: alu_ctrl = (funct7[5]) ? 4'b0110 : 4'b0010; // sub or add
                    3'b100: alu_ctrl = 4'b0001; // xor
                    3'b110: alu_ctrl = 4'b0011; // or
                    3'b111: alu_ctrl = 4'b0000; // and
                    default: alu_ctrl = 4'b0010;
                endcase
            end
            2'b11: alu_ctrl = 4'b1010; // lui
            default: alu_ctrl = 4'b0010;
        endcase
    end

endmodule
