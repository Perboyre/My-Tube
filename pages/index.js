import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import FavoriteList from "../src/components/FavoriteList";

function HomePage() {
    const estilosDaHomePage = {
        display: "flex",
        flexDirection: "column",
        flex: 1,
      };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <div style={estilosDaHomePage}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
                <FavoriteList favorites={config.favorites}></FavoriteList>
            </div>
        </>
    );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({theme}) => theme.backgroundLevel1}; 
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  margin-top: 56px;
  width: 100%;
  height: 200px;
  background-image: url(${config.bg});
  background-position: center center;
`;

const Banner = (props) => {
    return <StyledBanner imgSrc={props.imgSrc}></StyledBanner>;
};


const Header = (props) => {
  return (
    <StyledHeader>
    <Banner/>
      <section className="user-info">
        <img src={`http://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
};

function Timeline({ searchValue, ...propriedades }) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url} target="_blank">
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}