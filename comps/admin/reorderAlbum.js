import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { RetweetOutlined } from '@ant-design/icons'
// import SortableList, { SortableItem } from 'react-easy-sort';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ReorderAlbum({ albums, albumOrder }) {
  const [visible, setVisible] = useState(false);
  const [newAlbumOrder, setNewAlbumOrder] = useState([]);
  
  useEffect(() => {
      setNewAlbumOrder((albumOrder[0]) ? [...albumOrder[0].order] : []);
  }, [albumOrder])
  
  //Helper function to reorder elements
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  //After dragging has ended
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reorderedAlbums = reorder(
      newAlbumOrder,
      result.source.index,
      result.destination.index
    );

    //Saving to DB
    const albumOrderRef = doc(firestore, `albums/album-order`);
    console.log(albumOrderRef);
    updateDoc(albumOrderRef, { order : reorderedAlbums });

    setNewAlbumOrder(reorderedAlbums);
  }

  //Get item style for draggable items
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: '12px',
    margin: `0 0 8px`,
  
    // change background colour if dragging
    background: isDragging ? "#cae6ff" : "#fff",
    border: isDragging ? "1px solid #cae6ff" : "1px solid #1890ff",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const showDrawer = () => {
      setVisible(true);
  };
  const onClose = () => {
      setVisible(false);
  };

  return (
      <div>
          <Button icon={<RetweetOutlined style={{fontSize: '16px'}} />} type="primary" style={{fontSize: '16px', height: 'auto'}} onClick={showDrawer}>
              Reorder Albums
          </Button>
          <Drawer
              title="Reorder albums"
              placement="right"
              closable={true}
              onClose={onClose}
              visible={visible}
              width={'25%'}
          >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {newAlbumOrder.map((eachAlbum, index) => (
                        <Draggable key={eachAlbum.id} draggableId={eachAlbum.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {eachAlbum.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
          </Drawer>
      </div>
  );
}
