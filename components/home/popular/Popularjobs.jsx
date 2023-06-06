import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./popularjobs.style";

import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
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
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All Popular Jobs</Text>
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
          <FlatList
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{
              columnGap: SIZES.medium,
            }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
