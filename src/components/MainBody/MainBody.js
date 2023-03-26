import styled, { css, keyframes } from "styled-components";
import { useState, createContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Card from "../Card";
import data from "./data.json";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  background-color: var(--color-desat-dark-cyan);
`;

const Background = styled.img`
  object-fit: cover;
  width: 100%;
  height: 126px;
`;

const CardsWrapper = styled.div`
  padding: 56px 0px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  background-color: var(--color-light-gray-cyan);
  min-height: 100vh;
  width: 100%;
  transition: all 0.3s ease-in-out;
  position: relative;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 40px;
    padding-top: ${(p) => 60 + p.length * 15 + "px"};
  }
`;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) perspective(600px);
  }
`;

const TagsContainer = styled.div`
  position: absolute;
  top: -40px;
  left: 10%;
  width: 80%;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  justify-content: space-between;
  box-shadow: 5px 5px 17px var(--color-dark-gray-cyan);
  padding: 16px;
  border-radius: 8px;
  animation: 0.35s ${appear} ease-in-out forwards;
`;

const InnerTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagContainer = styled.button`
  display: flex;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 4px;

  &:focus {
    outline: 3px solid var(--color-dark-gray-cyan);
    outline-offset: 6px;
  }

  ${hoverSupported(css`
    &:hover {
      transform: scale(1.1);
    }
  `)}
`;

const Tag = styled.span`
  background-color: var(--color-light-gray-cyan);
  padding: 4px;
  color: var(--color-desat-dark-cyan);
  font-weight: var(--font-weight-bold);
  border-radius: 4px 0px 0px 4px;
`;

const CrossContainer = styled.div`
  background-color: var(--color-desat-dark-cyan);
  display: grid;
  place-content: center;
  padding: 6px;
  border-radius: 0px 4px 4px 0px;
`;

const Cross = styled.img`
  object-fit: cover;
  width: 15px;
  height: 15px;
`;

const Clear = styled.button`
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-gray-cyan);
  padding: 8px;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  border-radius: 4px;
  &:focus {
    outline: 3px solid var(--color-dark-gray-cyan);
    outline-offset: 3px;
  }

  ${hoverSupported(css`
    &:hover {
      transform: scale(1.1);
    }
  `)}
`;

export const MainContext = createContext();

function MainBody() {
  const [filterList, setFilterList] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [view, setView] = useState(data);

  useEffect(() => {
    if (filterList.length === 0) {
      setView(data);
    } else {
      const tmp = [];
      for (let entry of data) {
        if (
          filterList.includes(entry.role) ||
          filterList.includes(entry.level)
        ) {
          tmp.push(entry);
          continue;
        }

        for (let lang of entry.languages) {
          if (filterList.includes(lang)) {
            tmp.push(entry);
            break;
          }
        }
      }

      setView(tmp);
    }
    setTrigger(false);

    const timer = setTimeout(() => {
      setTrigger(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [filterList]);

  return (
    <Wrapper role={"main"}>
      <BackgroundWrapper>
        <Background
          src={
            isMobile
              ? "/frontendmentor_11/bg-header-mobile.svg"
              : "/frontendmentor_11/bg-header-desktop.svg"
          }
          alt={"header background image"}
        />
      </BackgroundWrapper>
      <CardsWrapper length={filterList.length}>
        {filterList.length > 0 ? (
          <TagsContainer
            aria-live={"polite"}
            aria-label={"filters applied container"}
          >
            <InnerTagsContainer>
              {filterList.map((entry, idx) => (
                <ClickableWrapper
                  key={`tag-gen-${idx}`}
                  onClick={() => {
                    const result = [];
                    for (let item of filterList) {
                      if (item === entry) {
                        continue;
                      }
                      result.push(item);
                    }

                    setFilterList(result);
                  }}
                  aria-label={`remove applied filter "${entry}"`}
                >
                  <TagContainer>
                    <Tag>{entry}</Tag>
                    <CrossContainer>
                      <Cross
                        src={"/frontendmentor_11/icon-remove.svg"}
                        alt={"remove icon"}
                      />
                    </CrossContainer>
                  </TagContainer>
                </ClickableWrapper>
              ))}
            </InnerTagsContainer>

            <ClickableWrapper
              key={"clear-button"}
              onClick={() => {
                setFilterList([]);
              }}
              aria-label={"clear all filters button"}
            >
              <Clear>Clear</Clear>
            </ClickableWrapper>
          </TagsContainer>
        ) : (
          ""
        )}
        <MainContext.Provider value={{ filterList, setFilterList }}>
          {trigger &&
            view.map((item, idx) => (
              <Card key={`card-${idx}`} item={item} data={data} />
            ))}
        </MainContext.Provider>
      </CardsWrapper>
    </Wrapper>
  );
}

export default MainBody;
