module data_memory_advanced(
    input clk,
    input mem_read,
    input mem_write,
    input  wire [2:0]  funct3,     // Needed to determine lb, lh, lw, etc.
    input  wire [31:0] addr,
    input  wire [31:0] write_data,
    output reg  [31:0] read_data
);

    reg [31:0] mem [0:255];
    integer i;

    initial begin
        for (i = 0; i < 256; i = i + 1)
            mem[i] = 32'b0;
            
        mem[0] = 32'd10; // Value at addr 0
        mem[1] = 32'd20; // Value at addr 4 (index 1)
    end

    wire [31:0] full_word = mem[addr[9:2]];
    wire [1:0] byte_offset = addr[1:0];

    // Asynchronous Read
    always @(*) begin
        if (mem_read) begin
            case (funct3)
                3'b000: begin // lb (Load Byte - Signed)
                    case (byte_offset)
                        2'b00: read_data = {{24{full_word[7]}}, full_word[7:0]};
                        2'b01: read_data = {{24{full_word[15]}}, full_word[15:8]};
                        2'b10: read_data = {{24{full_word[23]}}, full_word[23:16]};
                        2'b11: read_data = {{24{full_word[31]}}, full_word[31:24]};
                    endcase
                end
                3'b001: begin // lh (Load Halfword - Signed)
                    case (byte_offset[1]) // only look at bit 1 for halfword alignment
                        1'b0: read_data = {{16{full_word[15]}}, full_word[15:0]};
                        1'b1: read_data = {{16{full_word[31]}}, full_word[31:16]};
                    endcase
                end
                3'b010: begin // lw (Load Word)
                    read_data = full_word;
                end
                3'b100: begin // lbu (Load Byte Unsigned)
                    case (byte_offset)
                        2'b00: read_data = {24'b0, full_word[7:0]};
                        2'b01: read_data = {24'b0, full_word[15:8]};
                        2'b10: read_data = {24'b0, full_word[23:16]};
                        2'b11: read_data = {24'b0, full_word[31:24]};
                    endcase
                end
                3'b101: begin // lhu (Load Halfword Unsigned)
                    case (byte_offset[1])
                        1'b0: read_data = {16'b0, full_word[15:0]};
                        1'b1: read_data = {16'b0, full_word[31:16]};
                    endcase
                end
                default: read_data = 32'b0;
            endcase
        end else begin
            read_data = 32'b0;
        end
    end

    // Synchronous Write
    always @(posedge clk) begin
        if (mem_write) begin
            case (funct3)
                3'b000: begin // sb (Store Byte)
                    case (byte_offset)
                        2'b00: mem[addr[9:2]][7:0]   <= write_data[7:0];
                        2'b01: mem[addr[9:2]][15:8]  <= write_data[7:0];
                        2'b10: mem[addr[9:2]][23:16] <= write_data[7:0];
                        2'b11: mem[addr[9:2]][31:24] <= write_data[7:0];
                    endcase
                end
                3'b001: begin // sh (Store Halfword)
                    case (byte_offset[1])
                        1'b0: mem[addr[9:2]][15:0]  <= write_data[15:0];
                        1'b1: mem[addr[9:2]][31:16] <= write_data[15:0];
                    endcase
                end
                3'b010: begin // sw (Store Word)
                    mem[addr[9:2]] <= write_data;
                end
            endcase
        end
    end

endmodule
