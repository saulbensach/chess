import { Chess } from "../vendor/chess";

export const Chessboard = {
    mounted() {
        this.board = document.getElementById(this.el.id);
        this.squares = [];

        this.chess = new Chess()
        console.log(this.chess.ascii());

        this.test_board = undefined;
        this.test_board = this.chess.board();
        for(let y = 0; y < this.test_board.length; y++){
            for(let x = 0; x < this.test_board.length; x++){
                let cell = this.test_board[y][x];
                let index = x * 8 + y
                let isDark = (index + Math.floor(index / 8)) % 2 === 1;
                if (cell == null) {
                    let square = document.createElement("div");
                    square.classList.add("square");
                    square.classList.add(isDark ? "black" : "white");
                    this.squares.push(square);
                    this.board.appendChild(square);
                } else {
                    let square = document.createElement("div");
                    let piece = cell.color + cell.type;
                    square.classList.add(piece);
                    square.classList.add("square");
                    square.classList.add(isDark ? "black" : "white");
                    square.dataset.piece = piece;
                    square.addEventListener("mousedown", this.clickHandler.bind(this));
                    this.squares.push(square);
                    this.board.appendChild(square);
                }
                
            }
        }
        console.log(this.test_board);

    },

    clickHandler(event){
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