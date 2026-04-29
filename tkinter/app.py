import tkinter as tk

def get_content():
    content = text_area.get("1.0", tk.END)
    print(content)

root = tk.Tk()

text_area = tk.Text(root, height=8, width=40, font=("Consolas", 10))
text_area.pack()

text_area.insert(tk.END, "Type here...\nLine 2")

btn = tk.Button(root, text="Show Content", command=get_content)
btn.pack()

root.mainloop()