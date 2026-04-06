module task2(
    output reg [31:0] out1,
    output reg [31:0] out2,
    input RegWrite,
    input [4:0] address1,
    input [4:0] address2,
    input [4:0] Write_address,
    input [31:0] data,
    input clk,
    input reset
);
reg [31:0] memory [31:0];
integer i;
always @(posedge clk)
    begin   
        if(reset)
            for ( i = 0; i<32 ;i++ ) 
            begin
                memory[i]<=32'b0;
            end
        else
            begin
                if(RegWrite)
                    memory[Write_address]<=data;
                out1 <= memory[address1];
                out2 <= memory[address2];
            end
    end
endmodule