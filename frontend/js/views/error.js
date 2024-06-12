//@ts-nocheck

export function loadErrorPage() {
  document.getElementById("content").innerHTML = `
  <div class="h-100 d-flex justify-content-center align-items-center">
  <div class="wrapper"  style="text-align: center;">
      <h1>Page not Found</h1>
      <p>We can’t seem to find the page you are looking for.</p>
      <div>
        <a href="/"> <button class="btn btn-primary">Home</button></a>
      </div>
    </div>
    </div>
    `;
}
