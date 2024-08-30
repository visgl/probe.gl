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
  font: bold 32px/48px;
  margin: 24px 0 16px;
  position: relative;
}
h3 {
  font: bold 16px/24px;
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
  padding: 48px 48px 48px 80px;
}
`;

export default function IndexPage() {
  const baseUrl = useBaseUrl('/');

  return (
    <Layout title="Home" description="probe.gl">
      <>
        <Home getStartedLink="./docs/get-started" />
        <TextContainer>
          <h2>
          JavaScript Console Logging, Instrumentation, Benchmarking and Test Utilities.
          </h2>
          <hr className="short" />

          <div>
            <img src={`${baseUrl}images/icon-console.svg`} />
            <div>
              <h3>Console-Focused Logging</h3>
              <p>probe.gl optimizes in-browser logging.</p>
            </div>
          </div>

          <div>
            <img src={`${baseUrl}images/icon-high-precision.svg`} />
            <div>
              <h3>Benchmarking and Regression Testing Support</h3>
              <p>Creation benchmarking suites, and compare performance of test across runs.</p>
            </div>
          </div>
          
          <div>
            <img src={`${baseUrl}images/icon-debug.svg`} />
            <div>
              <h3>Optimized Chrome Debugging Experience</h3>
              <p>Uses advanced console APIs when available to create rich logs. </p>
            </div>
          </div>

          <div>
            <img src={`${baseUrl}images/icon-react.svg`} />
            <div>
              <h3>Size Conscious</h3>
              <p>An instrumentation library should be small.</p>
            </div>
          </div>

        </TextContainer>
      </>
    </Layout>
  );
}
