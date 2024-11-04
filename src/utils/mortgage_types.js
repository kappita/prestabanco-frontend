export const mortgage_types = [
  {
    name: 'Primera vivienda',
    max_term: 30,
    min_interest: 0.035,
    max_interest: 0.05,
    max_financed_amount: 0.8,
    requirements: [
      {
        name: "Comprobante de ingresos"
      },
      {
        name: "Certificado de avalúo"
      },
      {
        name: "Historial crediticio"
      }
    ]
  },
  {
    name: 'Segunda vivienda',
    max_term: 20,
    min_interest: 0.04,
    max_interest: 0.06,
    max_financed_amount: 0.7,
    requirements: [
      {
        name: "Comprobante de ingresos"
      },
      {
        name: "Certificado de avalúo"
      },
      {
        name: "Escritura de primera vivienda"
      },
      {
        name: "Historial crediticio"
      }
    ]
  }
]

