module alu(
    input  wire [31:0] a,
    input  wire [31:0] b,
    input  wire [3:0]  alu_ctrl,
    output reg  [31:0] result,
    output reg         zero
);

    always @(*) begin
        case (alu_ctrl)
            4'b0000: result = a & b; // AND
            4'b0010: result = a + b; // ADD
            4'b0011: result = a | b; // OR
            4'b0110: result = a - b; // SUB
            default: result = 32'd0;
        endcase

        if (result == 32'd0) begin
            zero = 1'b1;
        end else begin
            zero = 1'b0;
        end
    end

endmodule
