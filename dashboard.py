import customtkinter as ctk

class Dashboard(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title('Quizlet')
        self.geometry(f"{self.winfo_screenwidth()}x{self.winfo_screenheight()}+0+0")
        self.intro()

    def intro(self):
        frame_intro = ctk.CTkFrame(self)
#Making changes to see if it works
        for i in range(3):
            frame_intro.rowconfigure(i, weight=1)

        for i in range(4):
            frame_intro.columnconfigure(i, weight=1)

        q_label = ctk.CTkLabel(frame_intro, text="Q", font=("Arial", 200, "bold"), text_color="blue")
        q_label.grid(row=1, column=1, sticky='nse')

        rest_label = ctk.CTkLabel(frame_intro, text="uizlet", font=("Arial", 125, "bold"), text_color="white")
        rest_label.grid(row=1, column=2, sticky='wns')

        frame_intro.pack(expand=True, fill="both")

def main():
    app = Dashboard()
    app.mainloop()

if __name__ == '__main__':
    main()
