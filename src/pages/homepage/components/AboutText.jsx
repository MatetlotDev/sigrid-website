import { mobileWidth, tabletSmallWidth, tabletWidth } from '../../../constants';

export default function AboutText() {
  if (tabletWidth)
    return (
      <>
        <p>
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in
          Belgium.
        </p>
        <br />
        <p>
          She describes her artistic expression as &ldquo;a living process.&rdquo;
        </p>
        <br />
        <p>
          &ldquo;I believe that art is not only a way to express ourselves, but also
          a unique key to unlock the ...
        </p>
      </>
    );
  else if (tabletSmallWidth)
    return (
      <>
        <p>
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in
          Belgium.
        </p>
        <br />
        <p>
          She describes her artistic expression as &ldquo;a living process.&rdquo;
        </p>
        <br />
        <p>&ldquo;I believe that art is not only a ...</p>
      </>
    );
  else if (mobileWidth)
    return (
      <>
        <p>
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in
          Belgium.
        </p>
        <br />
        <p>She describes her artistic expression as &ldquo;a living process ...</p>
      </>
    );
  else
    return (
      <>
        <p>
          Sigrid Freyens is an African-born, Belgian artist who lives in Taranaki and
          whose paintings have been featured in solo and group exhibitions in
          Belgium.
        </p>
        <br />
        <p>
          She describes her artistic expression as &ldquo;a living process.&rdquo;
        </p>
        <br />
        <p>
          &ldquo;I believe that art is not only a way to express ourselves, but also
          a unique key to unlock the knowledge of the hidden world.&rdquo;
        </p>
        <br />
        <p>From a very young age , Sigrid has been driven by an ...</p>
      </>
    );
}
