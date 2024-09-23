# Memory Card Game

**Memory Card Game** is an interactive and engaging web-based game where players match pairs of cards by remembering their positions. The game is designed using **HTML**, **CSS**, and **JavaScript**, featuring smooth animations and a responsive design.

## Features

1. **Flip Cards to Find Matches**:
   - Players are presented with a grid of face-down cards.
   - Click on a card to reveal its image.
   - Players need to match pairs of identical cards by flipping them two at a time.
   - If a pair matches, they remain visible; if they don't, the cards flip back over after a short delay.

2. **Customizable Card Images and Colors**:
   - Before starting the game, users can choose the type of card images (e.g., fruits, cars, Pokémon, birds).
   - Users can also customize the color of the question mark on the back of the cards (e.g., blue, green, red) from a dropdown menu.

3. **Win Condition**:
   - The game is won when all pairs of cards are successfully matched.

4. **Randomized Card Layout**:
   - Each new game session shuffles the cards so that the pairs are placed randomly on the grid.

5. **Responsive Design**:
   - The game is designed to be fully responsive, providing an enjoyable experience on both desktop and mobile devices.

## Project Structure

The project is structured as follows:

- **img**: Contains all the card images, including the default question mark image.
- **index.html**: The main HTML file that defines the structure of the game interface.
- **style.css**: Contains all the CSS for styling the game, including the layout, card animations, and responsive design.
- **script.js**: Implements the game logic, including card flipping, matching logic, and randomization of the card grid.

## How It Works

1. **Start Game**:
   - When the page loads, the cards are displayed face down, and players can begin selecting two cards at a time.
   
2. **Matching Logic**:
   - When two cards are flipped over, the script checks if they are a match.
   - If the cards match, they remain visible; if they don't, they flip back over after a short timeout.

3. **Customizations**:
   - Users can choose their preferred card image type (e.g., fruits, cars, etc.) and question mark color from the dropdowns before the game starts.
   - Once the game starts, the selected images and color are applied to the cards.

4. **Winning the Game**:
   - When all pairs are matched, a winning message or animation can be displayed to the player, signaling the end of the game.

## Technologies Used

- **HTML**: Provides the basic structure and layout of the game interface.
- **CSS**: Used to style the game grid, cards, and apply animations.
- **JavaScript**: Handles the game logic, including card flipping, matching logic, randomization, and user interaction.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VShivamGitHub/Memory-Card-Game.git