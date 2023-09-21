import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  closestCenter,
  useSensors,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor, useSensor,useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Logo, Nav } from "../Globalstyles";
import { Link } from "react-router-dom";
import Skeletonloader from "./Skeletonloader";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 images per row */
  gap: 10px;
  padding: 5px 5px;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
  }
  `;
  const Imagediv=styled.div`
     width: 100%;
  height: auto; /* Maintain the aspect ratioo of the images */
  object-fit: cover;
  max-height: 350px;
  min-height: 250px;
  position: relative;
  cursor: pointer;
  & > img:first-child {
    opacity: 0;
  }
  :hover{
    border: 2px dashed gray;
    cursor: pointer;
    & > img:first-child {
    opacity: 1;
  }
  }
  @media only screen and (max-width: 420px) {
    max-height: 200px;
    min-height: 150px;
  }
  `

const GalleryImage = styled.img`
  width: 100%;
  height: auto; /* Maintain the aspect ratioo of the images */
  object-fit: cover;
  max-height: 350px;
  min-height: 250px;
  cursor: pointer;
  :hover{
    cursor: pointer;
  }
  @media only screen and (max-width: 420px) {
    max-height: 200px;
    min-height: 150px;
  }
`;

const Noresults = styled.div`
  width: 100vw;
  height: 200px;
  display: flex;
  align-items: center; 
  justify-content: center;
  p{
    font-size: 20px;
  }
`
const Search = styled.div`
  width: 40%;
  height: 50px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  background:#f542a7 ;
  form{
    display: flex;
    width: 100%;
    gap: 5px;
    button{
      background: black;
      color: white;
      font-weight: 600;
      cursor: pointer;
      
    }
    input{
      width: 85%;
      padding: 10px;
    }
  }
  @media only screen and (max-width: 420px) {
   width: 80%;
  }
`

const Add = styled.img`
  position: absolute;
  top:-15px;
  right: 0px;
  width: 30px;
  height: 30px;
  /* display: none; */
`
const Tags = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  color: white;
  p{
    font-weight: 400;
    font-size: 16px;
  }
`

const SortableImage = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });
    
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    
  };
  return (
    <GalleryImage
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      src={image.src}
      alt={image.id}
    /> 
  );
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [noResults, setNoResults] = useState(false); // State variable to track no results
  const [activeId, setActiveId] = useState(null);
  const [tags, setTags] = useState([]);


  useEffect(() => {
    // Function to fetch images from Pixabay
    const fetchImages = async () => {
      const apiKey = "39557901-cd998dbe1abe6579a972c3b6b";
      const baseUrl = "https://pixabay.com/api/";

      // Define the parameters for the Pixabay API request
      const params = {
        key: apiKey,
        per_page: 100, // Number of images per page (adjust as needed)
        q: searchQuery, // Include the search query
      };

      try {
        const response = await axios.get(baseUrl, { params });
        // Extract the images from the response data
        const fetchedImages = response.data.hits.map((hit) => ({
          id: hit.id.toString(),
          src: hit.largeImageURL,
          tags: hit.tags,
        }));
        setImages(fetchedImages);
        setTags(fetchedImages.map((image) => image.tags));
        console.log(tags)
        
      } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
      }
    };

    
    // Fetch images when the component mounts and whenever searchQuery changes
    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    // Function to fetch initial images when the component mounts
    const fetchInitialImages = async () => {
      const apiKey = "39557901-cd998dbe1abe6579a972c3b6b";
      const baseUrl = "https://pixabay.com/api/";

      // Define the parameters for the initial Pixabay API request
      const params = {
        key: apiKey,
        per_page: 100, // Number of images per page (adjust as needed)
      };
      try {
        const response = await axios.get(baseUrl, { params });
        // Extract the images from the response data
        const fetchedImages = response.data.hits.map((hit) => ({
          id: hit.id.toString(),
          src: hit.largeImageURL,
        }));
        setImages(fetchedImages);
     
        // Check if there are no results
        if (fetchedImages.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
      }
    };

    // Fetch initial images when the component mounts
    fetchInitialImages();
  }, []); // Empty dependency array to run on component mount

  function handleDragStart(event) {
    const {active} = event;
    
    setActiveId(active.id);
  }

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setImages((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      return arrayMove(images, oldIndex, newIndex);
    });
  };
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  //sensors to configure drag and drop on different device type
  
  const sensors = useSensors(
    useSensor(MouseSensor),
    touchSensor,
    useSensor(KeyboardSensor)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger a new search when the user submits the form
    const formData = new FormData(e.target);
    setSearchQuery(formData.get("search"));
    
  };
    return (
      <GalleryContainer>
            <Nav style={{padding:"10px"}}>
            <Link to="/"> <Logo src='./images/logo.svg' alt='logo'/></Link>
          {/* <Link to="/gallery"> <Button  color>Try It Free</Button></Link> */}
      </Nav>
      <Search>

      <form onSubmit={handleSearch}>

      <input

        type="text"

        placeholder="search images"

        value={searchQuery}

        onChange={(e) => setSearchQuery(e.target.value)}

      />

      <button type="submit">Search</button>

      </form>

      </Search>
      {/* ... */}
      {noResults ? (
        <Noresults>
          <p>No results found for '{searchQuery}'</p>
        </Noresults>
      ) : (
        <ImageContainer>
          {/* Conditionally render the skeleton loader */}
          {images.length === 0 ? (
            <Skeletonloader count={50} /> // Adjust the count as needed
          ) : (
  
            <DndContext
            collisionDetection={closestCenter}
            
            onDragEnd={onDragEnd}
            sensors={sensors}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              {images.map((image) => (
                <Imagediv key={image.id}>
                  <Add src= "/images/icons8-add-48.png" alt="add" />
                  <SortableImage key={image.id} image={image} />
                  {tags.includes(image.id) && <Tags><p>{image.tags}</p></Tags> }
                </Imagediv>
              ))}
            </SortableContext>
            <DragOverlay>
        {activeId ? <Item id={activeId} /> : null}
      </DragOverlay>
          </DndContext>
        )}
      </ImageContainer>
    )}
  </GalleryContainer>
  );
  };
  
  export default Gallery;
