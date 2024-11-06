import { useCallback, useState } from "react"
import React from "react"

function MortgagePeerReviewSection({mortgage}) {
  const [approve, setApprove] = useState(null)

  const handleSubmit = useCallback(() => {
    
  })

  return (<div>
    <h1>La solicitud revisada por {mortgage.review_requester.name} requiere revisión adicional</h1>
    <Checkbox
      label="Apruebas esta solicitud?"
      isChecked={approve}
      onChange={setApprove}
    />


  </div>)
}