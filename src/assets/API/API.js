import axios from "axios";

import JSZip from "jszip";

export const getPatients = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://gw.interop.community/xray/data/Patient",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data && response.data.entry) {
      return response.data.entry;
    } else {
      console.error("FHIR response does not contain the expected data.");
      return []; // Return an empty array or handle the error accordingly
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return []; // Return an empty array or handle the error accordingly
  }
};
export const getProcedures = async (accessToken, patientId) => {
  const baseUrl = "https://gw.interop.community/xray/data/Procedure?";
  const endpoint = `${baseUrl}subject=Patient/${patientId}`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/fhir+json",
      },
    });

    // Process the response, which contains the list of procedures
    const procedures = response.data;

    // Do something with the list of procedures
    return procedures;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching procedures:", error);
    throw error; // You may want to re-throw the error for the caller to handle
  }
};

export const downloadImage = async (pictureLink, setBlob) => {
  try {
    const response = await axios.get(pictureLink, {
      responseType: "arraybuffer",
    });

    const blob = new Blob([response.data], { type: "image/png" });

    setBlob(blob);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const extractImagesFromZip = async (zipFile, setTextFileContent) => {
  const zip = new JSZip();
  const blob = new Blob([zipFile]);

  return zip.loadAsync(blob).then((zip) => {
    const imagePromises = [];
    let index = 0;

    zip.forEach((relativePath, file) => {
      // Check if it's an image (second or third element in the zip)
      if (index === 1 || index === 2) {
        imagePromises.push(
          file.async("blob").then((blob) => ({ blob, name: file.name }))
        );
      } else if (index === 0) {
        // It's the first element (a text file)
        file.async("string").then((content) => {
          setTextFileContent(content);
        });
      }

      index++;
    });

    return Promise.all(imagePromises);
  });
};

export const postMedia = async (
  setIsLoading,
  laBlob,
  paBlob,
  setExtractedImages,
  setTextFileContent
) => {
  setIsLoading(true);

  let data = new FormData();

  if (laBlob) {
    data.append("image_lateral", laBlob, "la.png");
  }
  if (paBlob) {
    data.append("image_pa", paBlob, "pa.png");
  }

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://drf-classification-jx2kby5u3q-ts.a.run.app/drf",
    data: data,
    responseType: "blob",
  };

  axios
    .request(config)
    .then(async (response) => {
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        const extractedImages = await extractImagesFromZip(
          blob,
          setTextFileContent
        );
        setExtractedImages(extractedImages);

        setIsLoading(false);
      } else {
        console.error("Failed to download file.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
    });
};
