import React from "react";
import { Card, Label, Header } from "semantic-ui-react";
import "./Stats.scss";

const Stats = (props) => {
  /*
   * For the dropdown, this state will need to be stored somewhere. Database? How do we ensure that on refresh everything stays in the right category?
   * The cards should be externally populated through props.
   */

  /*TEMP */
  return (
    <div className="stats">
      <Card
        style={{
          height: "35%",
          marginTop: "5%",
        }}
      >
        <Card.Content>
          <Header style={{ marginBottom: "5%" }} as="h1">
            Stats
          </Header>
          <Card.Content extra>
            <Header as="h2">
              <Label
                style={{
                  marginTop: "2.5%",
                  marginBottom: "2.5%",
                  marginRight: "5%",
                }}
                circular
                color="black"
                size="massive"
              >
                {props.stats.totalApplications}
              </Label>
              Total Applications
            </Header>
          </Card.Content>
          <Card.Content extra>
            <Header as="h2">
              <Label
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  marginRight: "5%",
                }}
                circular
                color="blue"
                size="massive"
              >
                {props.stats.interviewCount}
              </Label>
              Total Interviews
            </Header>
          </Card.Content>
          <Card.Content extra>
            <Header as="h2">
              <Label
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  marginRight: "5%",
                }}
                circular
                color="red"
                size="massive"
              >
                {props.stats.offers}
              </Label>
              Total Offers
            </Header>
          </Card.Content>
          <Card.Content extra>
            <Header as="h2">
              <Label
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  marginRight: "5%",
                }}
                circular
                color="grey"
                size="massive"
              >
                {props.stats.rejections}
              </Label>
              Total Rejections
            </Header>
          </Card.Content>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Stats;
