export const Chessboard = {
    mounted() {
        console.log("hello!")
        this.board = document.getElementById(this.el.id);
        this.squares = [];

        for(let i = 0; i < 64; i++){
            let square = document.createElement("div");
            square.className = "square";
            square.setAttribute('draggable', false);
            this.squares.push(square);
            this.board.appendChild(square);

            let isDark = (i + Math.floor(i / 8)) % 2 === 1;
            square.classList.add(isDark ? "black" : "white");
        }

        // TODO its to late this can be better probably
        let piecesBlack = [
            "br", "bb", "bn", "bq", "bk", "bn", "bb", "br",
            "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"
        ]

        let piecesWhite = [
            "wr", "wb", "wn", "wk", "wq", "wn", "wb", "wr",
            "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"
        ]

        for(let i = 0; i < this.squares.length; i++){
            let row = Math.floor(i / 8);
            if(row < 2) {
                this.squares[i].dataset.index = i;
                this.squares[i].dataset.piece = piecesBlack[i];
                this.squares[i].addEventListener("mousedown", this.clickHandler.bind(this));
                this.squares[i].classList.add(piecesBlack[i]);
            }
            if(row >= 6){
                this.squares[i].dataset.index = i;
                this.squares[i].dataset.piece = piecesWhite[this.squares.length - i - 1];
                this.squares[i].addEventListener("mousedown", this.clickHandler.bind(this));
                this.squares[i].classList.add(piecesWhite[this.squares.length - i - 1]);
            }
        }
    },

    clickHandler(event){
        console.log("UWU")
        const square = event.currentTarget;
        const piece = document.createElement("div");
        piece.classList.add(square.dataset.piece);
        piece.classList.add("hover-square")
        
         // Set the piece's initial position to the clicked square
        const rect = square.getBoundingClientRect();
        piece.style.left = event.clientX - 50 + window.scrollX + "px";
        piece.style.top = event.clientY - 50 + window.scrollY  + "px";

        document.body.appendChild(piece);

        square.classList.remove(square.dataset.piece);

        this.activePiece = piece;
        this.originalSquare = square;

        document.addEventListener("mousemove", this.handlePieceMove.bind(this));
        document.addEventListener("mouseup", this.handlePieceRelease.bind(this));
    },

    handlePieceMove(event) {
        if (this.activePiece) {
          // Update the piece position based on the mouse position
          this.activePiece.style.left = event.clientX - 50 + window.scrollX + "px";
          this.activePiece.style.top = event.clientY - 50 + window.scrollY  + "px";
        }
    },

    handlePieceRelease(event) {
        if (this.activePiece) {
          // Remove the piece from the document
          document.body.removeChild(this.activePiece);
    
          // Show the original square again
          this.originalSquare.classList.add(this.originalSquare.dataset.piece);
    
          // Clean up event listeners
          document.removeEventListener("mousemove", this.handlePieceMove.bind(this));
          document.removeEventListener("mouseup", this.handlePieceRelease.bind(this));
    
          // Clear references
          this.activePiece = null;
          this.originalSquare = null;
        }
    },

    handlePieceClick(event) {
        // Add any logic for when the chess piece is clicked
        console.log("Piece clicked!");
        event.stopPropagation(); // Prevent the click event from propagating to the square
    }
}