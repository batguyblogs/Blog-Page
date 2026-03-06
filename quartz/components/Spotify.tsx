import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Added (userOpts?: any) to handle the constructor argument requirement
const Spotify: QuartzComponentConstructor = (userOpts?: any) => {
  const SpotifyComponent: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`spotify-container ${displayClass ?? ""}`}>
        <img 
          src="https://spotifylive-kappa.vercel.app/" 
          alt="Spotify Playback"
          style={{ 
            width: "100%", 
            height: "auto", 
            borderRadius: "10px",
          }}
        />
      </div>
    )
  }

  SpotifyComponent.css = `
  .spotify-container {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
  }
  .spotify-container img {
    max-width: 100%;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
  }
  `

  return SpotifyComponent
}

export default Spotify