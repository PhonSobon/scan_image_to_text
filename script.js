const imageUploader = document.getElementById('imageUploader');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
const languageSelect = document.getElementById('language');
let imageFile = null;

imageUploader.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile = file;
    const reader = new FileReader();
    reader.onload = function (event) {
      preview.src = event.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

function scanImage() {
  if (!imageFile) {
    alert('សូមជ្រើសរូបភាពជាមុនសិន (Please upload an image first).');
    return;
  }

  const selectedLang = languageSelect.value;
  output.textContent = 'កំពុងស្កេន... សូមរងចាំ (Scanning... Please wait)';

  Tesseract.recognize(
    imageFile,
    selectedLang,
    {
      logger: m => console.log(m)
    }
  ).then(({ data: { text } }) => {
    output.textContent = text;
  }).catch(err => {
    output.textContent = 'បញ្ហាកើតឡើង៖ ' + err.message;
  });
}
