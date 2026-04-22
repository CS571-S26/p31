import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BirdCard from "../components/BirdCard";

const PAGE_SIZE = 20;

function BrowseBirds() {
  const [birdCodeList, setBirdCodes] = useState([]);
  const [birds, setBirds] = useState([]);
  const [birdsWithPhotos, setBirdsWithPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  //Retrives local bird codes
  useEffect(() => {
    const cached = localStorage.getItem("bird-codes");
    if (cached) {
      setBirdCodes(JSON.parse(cached));
      return; //skips fetch if its in cache
    }

    fetch('https://api.ebird.org/v2/product/spplist/US-WI-025', {
      headers: {
        "X-eBirdApiToken": "gc15181l6ssc",
      }
    })
      .then(res => res.json())
      .then(data => {
        setBirdCodes(data);
        localStorage.setItem("bird-codes", JSON.stringify(data));
        console.log("Fetched Data")
      });
  }, []);

    fetch('')

  //retrieves taxonomy info for the bird codes
  useEffect(() => {
  if (birdCodeList.length === 0) return; // Should wait until there are codes available?

  // Check cache first
  const cached = localStorage.getItem("birds");
  if (cached) {
    setBirds(JSON.parse(cached));
    return;
  }

  const codeParam = birdCodeList.join(",");

  fetch(`https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&cat=species&species=${codeParam}`, {
    headers: {
      "X-eBirdApiToken": "gc15181l6ssc",
    }
  })
    .then(res => res.json())
    .then(data => {
      const matched = data.map(t => ({
        speciesCode:   t.speciesCode,
        commonName:    t.comName,
        sciName:       t.sciName,
        familyComName: t.familyComName,
      }));
      setBirds(matched);
      localStorage.setItem("birds", JSON.stringify(matched));
      console.log("Fetched")
    });
  }, [birdCodeList]);

  //fetches images for each bird but waits for all of them to show up so loading screen
  //will appear in the meantime
  useEffect(() => {
  if (birds.length === 0) return;

  const cached = localStorage.getItem("birds-with-photos");
  if (cached) {
    setBirdsWithPhotos(JSON.parse(cached));
    setLoading(false);
    return;
  }

  const photoPromises = birds.map(bird => {
    const slug = bird.sciName.trim().replace(/ /g, "_");
    return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`)
      .then(res => res.json())
      .then(data => ({ ...bird, photo: data.thumbnail?.source ?? null }))
      .catch(() => ({ ...bird, photo: null }));
  });

  Promise.all(photoPromises).then(results => {
    localStorage.setItem("birds-with-photos", JSON.stringify(results));
    setBirdsWithPhotos(results);
    setLoading(false);
  });

}, [birds]);


 const totalPages = Math.ceil(birdsWithPhotos.length / PAGE_SIZE);
  const pageBirds = birdsWithPhotos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return <div>Loading birds...</div>;
  }

  return (
    <Container>
      <h1>Browse Birds</h1>
      <p>{birdsWithPhotos.length} species found in Dane County</p>

      <Row className="g-3">
        {pageBirds.map(bird => (
          <Col key={bird.speciesCode} xs={12} sm={12} md={6} lg={4} xl={3}>
            <BirdCard bird={bird} />
          </Col>
        ))}
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <Button
          variant="outline-success"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ← Prev
        </Button>
        <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
        <Button
          variant="outline-success"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next →
        </Button>
      </div>
    </Container>
  );
}

export default BrowseBirds;