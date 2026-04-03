module test;
    reg clk;
    reg rst;

    // Clock generation
    initial clk = 0;
    always #5 clk = ~clk;  // 10 time units period

    // Reset signal
    initial begin
        rst = 1;
        #10 rst = 0;
    end

    // Dump signals for waveform
    initial begin
        $dumpfile("wave.vcd"); // output waveform file
        $dumpvars(0, test);    // dump all signals in this module
        #50;                   // simulation runs 50 time units
        $finish;
    end
endmodule