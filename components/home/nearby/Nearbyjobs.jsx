import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";

import { COLORS } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useState } from "react";

const Nearbyjobs = () => {
  const router = useRouter();
  // keep track of first api request
  const [first, setFirst] = useState(true);
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  // refetch api data
  const fetch = () => {
    refetch();
    setFirst(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All Nearby Jobs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          // first error in fetching data
          first ? (
            // refetch data
            fetch()
          ) : (
            // something went wrong
            <Text>Something went wrong</Text>
          )
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={job?.job_id}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
