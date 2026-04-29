import Profile from "../components/Profile";
import '../App.css';

function Home() {
  return (
    <div className="home-layout">

      <div className="home-howto">
        <h1 className="home-title">How To Use</h1>
        <p className="home-intro">
          Feather Deck is a flashcard application for users to study the birds
          of Wisconsin, matching a name to a face.
        </p>

        <ol className="home-list">
          <li>Navigate to the <strong>Decks</strong> page to create a blank flashcard deck. You can create up to 10 decks.</li>
          <li>In the <strong>Browse Birds</strong> tab, select from an abundance of local birds. Click <em>Add to Deck</em> to add a bird to your deck.</li>
          <li>Navigate back to <strong>Decks</strong>, where you can view your deck, remove birds, and study them.</li>
          <li>The <strong>Study</strong> feature shows an image of the bird. Flip the card to reveal its name and info.</li>
          <li>When you finish a deck you can exit study mode or reshuffle for more studying.</li>
        </ol>

        <p className="home-optional-label">Optional Features</p>
        <ol className="home-list">
          <li>Set up your profile and add your 4 favorite birds via the <em>Favorites</em> button on the Browse Birds page.</li>
          <li>View information about the author of this website, including their 4 favorite birds.</li>
        </ol>
      </div>

      <div className="home-profile">
        <Profile />
      </div>

    </div>
  );
}

export default Home;