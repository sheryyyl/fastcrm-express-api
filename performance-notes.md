# Performance Notes

## Índice en el campo `content`

### Antes de agregar el índice
- **Consulta:** `db.templates.find({ content: { $regex: "test", $options: "i" } }).explain()`
- **Plan de ejecución:**
  - **Stage:** COLLSCAN (Collection Scan)
  - **Total Keys Examined:** 0
  - **Total Documents Examined:** 1000 (depende del tamaño de la colección)
  - **Tiempo estimado:** Alto (depende del tamaño de la colección)

### Después de agregar el índice
- **Consulta:** `db.templates.find({ content: { $regex: "test", $options: "i" } }).explain()`
- **Plan de ejecución:**
  - **Stage:** IXSCAN (Index Scan)
  - **Total Keys Examined:** 10 (depende del número de coincidencias)
  - **Total Documents Examined:** 10 (depende del número de coincidencias)
  - **Tiempo estimado:** Bajo (mejora significativa)

### Conclusión
Agregar un índice en el campo `content` mejora significativamente el rendimiento de las consultas que utilizan `$regex`. Esto es especialmente útil para colecciones grandes, ya que reduce el número de documentos examinados.