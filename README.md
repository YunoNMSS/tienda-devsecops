# Tienda DevSecOps

Tienda en línea mínima (Node.js + Express) con un pipeline de seguridad en GitHub Actions.
Proyecto de demostración para la exposición "DevSecOps y seguridad de la cadena de suministro de software".

## Qué hace el pipeline

El archivo `.github/workflows/seguridad.yml` corre cuatro controles en cada push y en cada pull request:

| Control | Herramienta | Qué revisa | Falla cuando |
| --- | --- | --- | --- |
| 1. Secretos | Gitleaks | Claves y contraseñas escritas en el código | Encuentra una credencial |
| 2. SAST | Semgrep, con las reglas de `.semgrep/reglas.yml` | El código propio | Encuentra un patrón peligroso |
| 3. SCA | npm audit | Las dependencias | Hay una vulnerabilidad alta o crítica |
| 4. SBOM | npm sbom (formato CycloneDX) | Genera el inventario de componentes | Fallan las pruebas o la instalación |

## Medidas de cadena de suministro aplicadas al propio pipeline

- Las acciones de GitHub están fijadas por hash de commit, no por etiqueta.
- Gitleaks se descarga en una versión fija y se verifica su suma SHA-256 antes de usarlo.
- Semgrep se instala en una versión fija.
- El pipeline solo tiene permiso de lectura sobre el repositorio.
- Las dependencias se instalan con `npm ci --ignore-scripts`: exactamente lo que dice el archivo de bloqueo y sin ejecutar scripts de instalación.

## Uso local

```
npm ci
npm test
npm start
```

## Cambios de la demostración

```
npm run demo:inseguro    # agrega una clave en el código y una librería vulnerable
npm run demo:corregir    # quita la clave y actualiza la librería
```

La clave que usa la demostración es falsa.
