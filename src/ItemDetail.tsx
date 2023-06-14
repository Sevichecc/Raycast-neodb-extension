import useDetail from "./hooks/useDetail";
import { Item, Podcast, Movie, Performance, Album, Game, Book, ItemType, TV, Category } from "./types";
import { Detail } from "@raycast/api";
import BookMeta from "./components/BookMeta";
import MovieMeta from "./components/MovieMeta";
import TVMeta from "./components/TVMeta";
import PodcastMeta from "./components/PodcastMeta";
import GameMeta from "./components/GameMeta";
import MusicMeta from "./components/MusicMeta";
import PerformanceMeta from "./components/PerformanceMeta";

export function renderGenre(genre: string[]) {
  return (
    genre.length !== 0 && (
      <Detail.Metadata.TagList title="Genre">
        {genre.map((genre) => (
          <Detail.Metadata.TagList.Item text={genre} color={"#eed535"} key={genre} />
        ))}
      </Detail.Metadata.TagList>
    )
  );
}

const renderMetaData = (data: ItemType, category: Category, rating: number) => {
  switch (category) {
    case "book":
      return <BookMeta data={data as Book} rating={rating} />;
    case "movie":
      return <MovieMeta data={data as Movie} rating={rating} />;
    case "tv":
      return <TVMeta data={data as TV} rating={rating} />;
    case "podcast":
      return <PodcastMeta data={data as Podcast} rating={rating} />;
    case "music":
      return <MusicMeta data={data as Album} rating={rating} />;
    case "game":
      return <GameMeta data={data as Game} rating={rating} />;
    case "performance":
      return <PerformanceMeta data={data as Performance} rating={rating} />;
    default:
      return null;
  }
};

const ItemDetail: React.FC<{ item: Item }> = ({ item }) => {
  const { category, uuid, cover_image_url, display_title, brief, rating } = item;
  const { isLoading, data } = useDetail(category, uuid);

  const content = `
  ## ${display_title}
  
  ![](${cover_image_url})

  ${brief}
  `;
  return (
    <Detail
      isLoading={isLoading}
      markdown={content + ((data as Album)?.track_list || "")}
      navigationTitle={display_title}
      metadata={data && renderMetaData(data, category, rating)}
    />
  );
};

export default ItemDetail;
