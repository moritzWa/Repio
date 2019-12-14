import React, { Fragment, useContext, useEffect } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import ItemItem from "./ItemItem"
import Spinner from "../layout/Spinner"
import ItemContext from "../../context/item/itemContext"

const Items = () => {
  const itemContext = useContext(ItemContext)

  const { items, filtered, getItems, loading } = itemContext

  useEffect(() => {
    getItems()
    // eslint-disable-next-line
  }, [])

  if (items !== null && items.length === 0 && !loading) {
    return <h4>Please add a item</h4>
  }

  console.log(items)

  return (
    <Fragment>
      {items !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(item => (
                <CSSTransition key={item._id} timeout={500} classNames="item">
                  <ItemItem item={item} />
                </CSSTransition>
              ))
            : items.map(item => (
                <CSSTransition key={item._id} timeout={500} classNames="item">
                  <ItemItem item={item} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  )
}

export default Items
