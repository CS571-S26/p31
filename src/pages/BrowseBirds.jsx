import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import BirdCard from "../components/BirdCard";

const PAGE_SIZE = 20;

function BrowseBirds() {
  const [birdCodeList, setBirdCodes] = useState([]);
  const [birds, setBirds] = useState([]);
  const [birdsWithPhotos, setBirdsWithPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nameRef, setName] = useState("");


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

  const Reset = () => {
    setName("");
    setPage(1);
  };

  let filteredBirds = birdsWithPhotos;
  filteredBirds = filteredBirds.filter(b =>
    b.commonName.toLowerCase().includes(nameRef.toLowerCase().trim())
  );

  let numPages = Math.ceil(filteredBirds.length / PAGE_SIZE);
  let pageArray = [];
  for (let i = 0; i < numPages; i++) {
    pageArray[i] = i + 1;
  }

  if (loading) {
    return <div>Loading birds...</div>;
  }

  return (
    <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <div>
            <h1 style={{ margin: 0 }}>Browse Birds</h1>
            <p style={{ margin: 0 }}>There are <strong>{filteredBirds.length}</strong> bird(s) matching your search.</p>
          </div>
          <Form.Label htmlFor="searchName" className="visually-hidden">Search by bird name</Form.Label>
          <Form.Control
            id="searchName"
            value={nameRef}
            onChange={e => { setName(e.target.value); setPage(1); }}
            placeholder="Search for a bird..."
            style={{ maxWidth: "450px" }}
          />
        </div>
        <hr />
      <Container fluid>
        <Row>
          {filteredBirds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(bird => (
            <Col key={bird.speciesCode} xs={12} sm={12} md={6} lg={4} xl={3}>
              <BirdCard bird={bird} />
            </Col>
          ))}
        </Row>
      </Container>

      <br />
      <Pagination>
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Pagination.Prev>
        {pageArray.map(num => (
          <Pagination.Item key={num} active={page === num} onClick={() => setPage(num)}>{num}</Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === numPages || filteredBirds.length === 0}>Next</Pagination.Next>
      </Pagination>
    </div>
  );
}

export default BrowseBirds;