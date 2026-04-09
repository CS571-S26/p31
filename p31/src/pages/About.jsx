import { Container } from "react-bootstrap";

function About() {
  return <>
    <div >
      <Container>
        <div >
          <h1 >Kendall Scholly</h1>
          <p >
            BS Psychology,  Minors in Computer Science & Data Science
            </p>
        </div>
        <div >
          <h2 >Why Feather Deck?</h2>
          <p>
            Outside of school and class I spend most of my time outdoors. 
            Over the summer I picked up bird watching at the UW Arboretum and often want to
            memorize the names of the birds I see. I created Feather Deck as a way to study the
            local birds in Dane County. 
          </p>
        </div>

        <div>
          <h2 >Four Favorite Birds</h2>
          
        </div>

        <div>
          <h2> Resume </h2>

          <iframe
            src="/p31/public/Kendall_Scholly_Resume.pdf"
            title="Kendall Scholly Resume"
          />
        </div>
      </Container>
    </div>
  </>
}
export default About;