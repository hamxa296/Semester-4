module alu_control(
    input  wire [1:0] alu_op,
    input  wire [2:0] funct3,
    input  wire [6:0] funct7,
    output reg  [3:0] alu_ctrl
);

    always @(*) begin
        case (alu_op)
            2'b00: alu_ctrl = 4'b0010; // lw/sw
            2'b01: alu_ctrl = 4'b0110; // beq
            2'b10: begin    //R-type
                case (funct3)
                    3'b000: begin // add/sub
                        if (funct7[5])
                            alu_ctrl = 4'b0110; // sub
                        else
                            alu_ctrl = 4'b0010; // add
                    end
                    3'b110: alu_ctrl = 4'b0011; // or
                    3'b111: alu_ctrl = 4'b0000; // and
                    default: alu_ctrl = 4'b0010;
                endcase
            end
            default: alu_ctrl = 4'b0010;
        endcase
    end

endmodule
