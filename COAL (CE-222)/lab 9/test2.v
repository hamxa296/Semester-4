module test2;
    reg [2:0] funct3;
    reg [6:0] funct7;
    reg [1:0] ALUOp;
    wire [3:0] Operation;
    
    task2 uut (
        .funct3(funct3),
        .funct7(funct7),
        .ALUOp(ALUOp),
        .Operation(Operation)
    );
    
    initial begin
        $dumpfile("test2.vcd");
        $dumpvars(0, test2);
        $monitor("Time=%0t ALUOp=%b funct3=%b funct7=%b Operation=%b", 
                 $time, ALUOp, funct3, funct7, Operation);
        
        ALUOp = 2'b00; funct3 = 3'b000; funct7 = 7'b0000000;
        #100
        
        ALUOp = 2'b01; funct3 = 3'b000; funct7 = 7'b0000000;
        #100
        
        ALUOp = 2'b10; funct3 = 3'b000; funct7 = 7'b0000000;
        #100

        ALUOp = 2'b11; funct3 = 3'b000; funct7 = 7'b1111111;
        #100
        
        ALUOp = 2'b10; funct3 = 3'b111; funct7 = 7'b0000000;
        #100
        
        ALUOp = 2'b11; funct3 = 3'b110; funct7 = 7'b0000000;
        #100
        
        $finish;
    end
endmodule