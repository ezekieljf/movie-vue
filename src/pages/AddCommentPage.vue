<template>
  <div class="bg-dark text-light min-vh-100">
    <div class="container py-5">

      <RouterLink
        :to="`/movies/${route.params.id}`"
        class="btn btn-outline-light mb-4"
      >
        ← Back to Movie
      </RouterLink>

      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">

          <div class="card bg-black text-light border-secondary shadow">
            <div class="card-body p-4">

              <h2 class="fw-bold mb-2">Add Comment</h2>
              <p class="text-secondary mb-4">
                Share your thoughts about this movie.
              </p>

              <form @submit.prevent="addComment">

                <div class="mb-3">
                  <label for="comment" class="form-label fw-bold">
                    Your Comment
                  </label>

                  <textarea
                    id="comment"
                    class="form-control bg-dark text-light border-secondary"
                    rows="5"
                    placeholder="Write your comment here..."
                    v-model="comment"
                    required
                  ></textarea>
                </div>

                <div class="d-flex justify-content-end gap-2">

                  <RouterLink
                    :to="`/movies/${route.params.id}`"
                    class="btn btn-outline-secondary"
                  >
                    Cancel
                  </RouterLink>

                  <button
                    type="submit"
                    class="btn btn-danger"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Submitting...' : 'Submit Comment' }}
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Notyf } from 'notyf';
    import api from '../api';

    const route = useRoute();
    const router = useRouter();
    const notyf = new Notyf();

    const comment = ref('');
    const isLoading = ref(false);

    const addComment = async () => {
        isLoading.value = true;

        const commentData = {
            comment: comment.value
        };

        try {
            await api.patch(
                `/movies/addComment/${route.params.id}`,
                commentData
            );

            notyf.success('Comment added successfully!');
            router.push(`/movies/${route.params.id}`);

        } catch (err) {
            console.error(err);
            notyf.error(
                err.response?.data?.message || 'Failed to add comment.'
            );
        } finally {
            isLoading.value = false;
        }
    };
</script>