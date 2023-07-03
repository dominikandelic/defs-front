import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import FileStorageImage from "../../public/file_storage.svg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blockchain project</title>
        <meta name="description" content="Blockchain project meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mt-5">
          <Col>
            <Image
              className="img-fluid"
              width={750}
              height={300}
              alt="Decentralized, blockchain-based file storage"
              src={FileStorageImage}
            />
          </Col>
          <Col>
            <div>
              <h1>File sharing made decentralized, private and secure!</h1>
              <h2>
                We allow you to upload your files securely and permanently. All
                the files are kept forever on the blockchain.
              </h2>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <h2>How it works:</h2>
        </Row>
        <Row>
          <h3>
            1. Upload your file with a secure key that you will pass on to the
            recipient
          </h3>
        </Row>
        <Row>
          <h3>
            2. The file is encrypted and forever stored in a P2P network, with
            file hash stored in the blockchain.
          </h3>
        </Row>
        <Row>
          <h3>
            3. The recipient goes to our{" "}
            <Link href="/download_file">Download</Link> page and pastes the file
            hash*, along with the file key.
          </h3>
        </Row>
        <Row>
          <h3>4. The file is now decrypted and downloaded to your device.</h3>
        </Row>
        <Row>
          <h4>
            *Users can also browse through the whole blockchain transparently
            and view all the file hashes, but can't do anything with the file
            since they don't know the key.
          </h4>
        </Row>
      </Container>
    </>
  );
}
