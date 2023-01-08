import Header from '../../components/Header';
import Quote from '../../components/Quote';

function Home() {
  return (
    <>
      <Header />
      <Quote>
        <blockquote>&ldquo;Painting is energy made visible&rdquo;</blockquote>
        <p>
          I believe that art is not only a way to express ourselves, but also a
          unique key to unlock the knowledge of the hidden world.
        </p>
      </Quote>
    </>
  );
}

export default Home;
