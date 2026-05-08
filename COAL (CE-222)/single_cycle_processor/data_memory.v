module data_memory(
    input clk,
    input mem_read,
    input mem_write,
    input  wire [31:0] addr,
    input  wire [31:0] write_data,
    output reg  [31:0] read_data
);

    reg [31:0] mem [0:255];
    integer i;

    initial begin
        for (i = 0; i < 256; i = i + 1)
            mem[i] = 32'b0;
            
        mem[0] = 32'd10; //
        mem[1] = 32'd20; //  1)
    end

    always @(*) begin
        if (mem_read) begin
            read_data = mem[addr[9:2]];
        end else begin
            read_data = 32'b0;
        end
    end

    always @(posedge clk) begin
        if (mem_write)
            mem[addr[9:2]] <= write_data;
    end

endmodule
