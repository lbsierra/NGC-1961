<script setup>
console.log("Testing Vue component setup script");
const apiKey = 'oDNnjaY2ycZpRCnFpYTbLvbsxbueZGMfnW05l7MV';  

fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
</script>

