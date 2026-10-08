import React from 'react';
import {Home} from '@vis.gl/docusaurus-website/components';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styled from 'styled-components';
import Layout from '@theme/Layout';

const TextContainer = styled.div`
max-width: 800px;
padding: 64px 112px;
font-size: 16px;

h2 {
  font-family: var(--ifm-heading-font-family);
  font-size: 32px;
  line-height: 1.2;
  margin: 24px 0 16px;
  position: relative;
}
h3 {
  font-family: var(--ifm-heading-font-family);
  font-size: 18px;
  line-height: 1.4;
  margin: 0;
  position: relative;
}
> div {
  display: flex;
  align-items: start;
  margin-top: 2em;
}
img {
  margin-right: 1em;
}
p {
  margin: 0;
}
hr {
  border: none;
  background: #E1E8F0;
  height: 1px;
  margin: 24px 0 0;
  width: 32px;
  height: 2px;
}
@media screen and (max-width: 768px) {
  max-width: 100%;
  width: 100%;
  padding: 32px 24px;
}
`;

const HomeHero = styled.div`
  h1 { color: #f5f8fc; }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
`;

function HeroExample() {
  const baseUrl = useBaseUrl('/');
  return (
    <HeroBackground
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 17, 31, 0.94) 0%, rgba(8, 17, 31, 0.84) 34%, rgba(8, 17, 31, 0.36) 70%, rgba(8, 17, 31, 0.12) 100%), url(${baseUrl}images/probe-hero.webp)`
      }}
    />
  );
}

export default function IndexPage() {
  const baseUrl = useBaseUrl('/');

  return (
    <Layout title="Home" description="probe.gl">
      <>
        <HomeHero>
          <Home theme="dark" HeroExample={HeroExample} getStartedLink="./docs/get-started" />
        </HomeHero>
        <TextContainer>
          <h2>
          JavaScript Console Logging, Instrumentation, Benchmarking and Test Utilities.
          </h2>
          <hr className="short" />

          <div>
            <img alt="" src={`${baseUrl}images/icon-console.svg`} />
            <div>
              <h3>Console-Focused Logging</h3>
              <p>Control console output with log levels and persistent browser settings.</p>
            </div>
          </div>

          <div>
            <img alt="" src={`${baseUrl}images/icon-high-precision.svg`} />
            <div>
              <h3>Benchmarking and Regression Testing Support</h3>
              <p>Create benchmark suites and compare performance across runs.</p>
            </div>
          </div>
          
          <div>
            <img alt="" src={`${baseUrl}images/icon-debug.svg`} />
            <div>
              <h3>Optimized Chrome Debugging Experience</h3>
              <p>Uses advanced console APIs when available to create rich logs. </p>
            </div>
          </div>

          <div>
            <img alt="" src={`${baseUrl}images/icon-react.svg`} />
            <div>
              <h3>Size Conscious</h3>
              <p>Install logging, statistics, and testing packages independently.</p>
            </div>
          </div>

        </TextContainer>
      </>
    </Layout>
  );
}
