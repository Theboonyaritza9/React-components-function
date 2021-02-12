import { PureComponent } from "react"
import React from 'react'
import { pure } from "recompose"

function ComponentToPrint() {
    return (
        <div>
            <h1>Merchandise</h1>
            <p>1. R100K</p>
            <p>2. R560K</p>
            <p>3. R470K</p>

        </div>
    )
}

export default pure(ComponentToPrint)


