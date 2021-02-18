import React from 'react';
import axios from 'axios';

const Resources = (props) => {

  return (
      <div id='resource'>
          <h1>National Suicide Prevention Lifeline</h1>
          <h2>800-273-8255</h2>
          <h2>Nationl Institute of Mental Health</h2>
          <a href='https://www.nimh.nih.gov/health/find-help/index.shtml' >LINK</a>
          <div><h2>Depression Resources</h2>
              <ul>
                  <li><a href="https://adaa.org/understanding-anxiety/depression">Anxiety and Depression Association of America</a></li>
                  <li><a href="https://www.mhanational.org/self-help-tools">Tools for Mental Wellness</a></li>
              </ul></div>
          <div><h2>Substance Abuse Resources</h2>
              <ul>
                  <li> <a href="https://www.samhsa.gov/find-help/atod">Resources for various substance abuse</a></li>
              </ul></div>
          <div> <h2>Domestic Abuse Resources</h2>
              <h3>Domestic Abuse Hotline</h3>
              <h4>1-800-799-7233</h4>
              <ul>
                  <li><a href="https://www.thehotline.org/identify-abuse/understand-relationship-abuse/">National Domestic Violence Hotline Website</a> </li>
                  <li>
                      <a href="https://ncadv.org/"> National Coalition Against Domestic Violence </a>
                  </li>

              </ul></div>

          <h2> Resources for Stress and Anxiety </h2>
          <ul>
              <li> <a href="https://www.counseling.org/knowledge-center/mental-health-resources/anxiety">American Counseling Association</a></li>
              <li>
                  <a href="https://www.apa.org/topics/anxiety/disorders">American Psychological Association</a>
              </li>

          </ul>
          <h3>In Case of Emergency</h3>
            <h3>Please Call 9-1-1</h3>
      </div>

  );
};
export default Resources;
